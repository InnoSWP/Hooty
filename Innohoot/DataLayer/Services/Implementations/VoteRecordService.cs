using System.Collections.Specialized;
using AutoMapper;

using Innohoot.DTO;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;

using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class VoteRecordService : IVoteRecordService
	{
		protected readonly IMapper _mapper;
		protected readonly IDBRepository _db;
		public VoteRecordService(IDBRepository repository, IMapper mapper)
		{
			_db = repository;
			_mapper = mapper;
		}
		/// <summary>
		/// Add a new vote that came from a participant
		/// </summary>
		/// <param name="voteRecordDTO"></param>
		/// <returns></returns>
		public async Task<Guid> AddVoteRecord(VoteRecordDTO voteRecordDTO)
		{
			var voteRecord = _mapper.Map<VoteRecord>(voteRecordDTO);

			if (voteRecord is not null)
			{
				await _db.Add<VoteRecord>(voteRecord);
				await _db.Save();
			}

			return voteRecord.Id;
		}

		public async Task<List<VoteRecord>> GetVotesBySessionId(Guid sessionId)
		{
			return await _db.Get<VoteRecord>(x => x.Session.Id == sessionId)
				.Include(x => x.Option)
				.ThenInclude(y => y.Poll)
				.ToListAsync();
		}

		public async Task<List<VoteRecord>> GetVotesByParticipant(Guid sessionId, string participantName)
		{
			var session = await _db.Get<Session>(sessionId).FirstOrDefaultAsync();

			return await _db.Get<VoteRecord>(x => x.Session.Id == sessionId && x.ParticipantName == participantName)
				.Include(x => x.Option)
				.ThenInclude(y => y.Poll)
				.ToListAsync();
		}

		public async Task<VoteRecord?> GetVoteByParticipant(Guid pollId, string participantName)
		{
			var session = await _db.Get<Poll>(pollId).FirstOrDefaultAsync();

			return await _db.Get<VoteRecord>(x => x.Option.PollId == pollId && x.ParticipantName == participantName)
				.Include(x => x.Option)
				.ThenInclude(y => y.Poll)
				.FirstOrDefaultAsync();
		}

		public async Task<List<VoteRecord>> GetVotesBySessionAndPollId(Guid sessionId, Guid pollId)
		{
			return await _db.Get<VoteRecord>(x => (x.Session.Id == sessionId && x.Option.PollId == pollId))
				.OrderBy(o => o.Option.Poll.OrderNumber)
				.ThenBy(v => v.ParticipantName)
				.ToListAsync();
		}

		/// <summary>
		/// Select voteRecord by poll and active session and return data in dictionary 
		/// </summary>
		/// <param name="userId"></param>
		/// <param name="pollId"></param>
		/// <returns></returns>
		public async Task<VoteResultDTO?> GetVoteResult(Guid sessionId, Guid pollId)
		{
			var activeSession = await _db.Get<Session>(sessionId).FirstOrDefaultAsync();

			if (activeSession is not null)
			{
				var activePoll = await _db.Get<Poll>(x => x.Id == pollId)
					.Include(x => x.Options)
					.FirstOrDefaultAsync();

				var voteRecords = await _db.Get<VoteRecord>(x => x.Session.Id == activeSession.Id && x.Option.Poll.Id == pollId)?.ToListAsync();
				var voteResultDTO = new VoteResultDTO();

				voteResultDTO.VoteDistribution = activePoll.Options?.ToDictionary(i => i.Id, i => 0);

				foreach (var vote in voteRecords)
				{
					voteResultDTO.VoteDistribution[vote.Option.Id] += 1;
				}

				voteResultDTO.PollId = activePoll.Id;
				_db.Context.ChangeTracker.Clear();
				return voteResultDTO;
			}
			_db.Context.ChangeTracker.Clear();
			return null;
		}

		public async Task<IOrderedEnumerable<KeyValuePair<string, int>>> GetTopParticipants(Guid sessionId)
		{
			//participantName and score
			var top = new Dictionary<string, int>();
			var session = await _db.Get<Session>(sessionId).FirstOrDefaultAsync();

			if (session?.ParticipantList is not null)
			{
				foreach (var participant in session.ParticipantList)
				{
					top.Add(participant, 0);

					var votes = await _db
						.Get<VoteRecord>(y => y.SessionId == sessionId && y.ParticipantName == participant)
						.Include(v => v.Option)
						.ToListAsync();

					foreach (var vote in votes)
					{ 
						if (vote.Option.IsAnswer)
							top[participant]++;
					}
				}
			}

			var sortedTop = from entry in top orderby entry.Value descending select entry;

			//SortedDictionary<string, int> sortedTop = new SortedDictionary<string, int>(top);
		

			return sortedTop;
		}
	}
}
