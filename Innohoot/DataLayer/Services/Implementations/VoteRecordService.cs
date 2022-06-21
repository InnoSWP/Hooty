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
		public async Task<List<VoteRecord>> GiveVotesBySessionId(Guid sessionId)
		{
			return await _db.Get<VoteRecord>(x => x.Session.Id == sessionId).Include(x => x.Option).ThenInclude(y => y.Poll).ToListAsync();
		}
		public async Task<List<VoteRecord>> GiveVotesBySessionAndPollId(Guid sessionId, Guid pollId)
		{
			return await _db.Get<VoteRecord>(x => (x.Session.Id == sessionId && x.Option.PollId == pollId)).ToListAsync();
		}
		/// <summary>
		/// Select voteRecord by poll and active session and return data in dictionary 
		/// </summary>
		/// <param name="userId"></param>
		/// <param name="pollId"></param>
		/// <returns></returns>
		public async Task<VoteResultDTO?> GiveVoteResult(Guid sessionId, Guid pollId)
		{
			var activeSession = await _db.Get<Session>(sessionId).FirstOrDefaultAsync();
			if (activeSession is not null)
			{
				var activePoll = await _db.Get<Poll>(x => x.Id == pollId).Include(x => x.Options).FirstOrDefaultAsync();
				var voteRecords = await _db.Get<VoteRecord>(x => x.Session.Id == activeSession.Id && x.Option.Poll.Id == pollId)?.ToListAsync();
				var voteResultDTO = new VoteResultDTO();

				voteResultDTO.VoteDistribution = activePoll.Options?.ToDictionary(i => i.Id, i => 0);

				foreach (var vote in voteRecords)
				{
					voteResultDTO.VoteDistribution[vote.Option.Id] += 1;
				}

				voteResultDTO.PollId = activePoll.Id;
				return voteResultDTO;
			}
			return null;
		}
	}
}
