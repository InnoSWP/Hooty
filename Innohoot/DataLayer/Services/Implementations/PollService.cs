using AutoMapper;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class PollService : IPollService
	{
		protected readonly IMapper _mapper;
		protected readonly IDBRepository _db;

		public PollService(IDBRepository repository, IMapper mapper)
		{
			_db = repository;
			_mapper = mapper;
		}
		public async Task<Guid> Create(PollDTO pollDTO)
		{
			var poll = _mapper.Map<Poll>(pollDTO);
			//at this moment poll.User = null
			poll.PollCollection = new PollCollection() { Id = poll.PollCollectionId };
			_db.Context.Entry(poll.PollCollection).State = EntityState.Unchanged;

			await _db.Add(poll);
			await _db.Save();
			return poll.Id;
		}
		public async Task Update(PollDTO pollDTO)
		{
			var poll = _mapper.Map<Poll>(pollDTO);

			poll.PollCollection = new PollCollection() { Id = poll.PollCollectionId };
			_db.Context.Entry(poll.PollCollection).State = EntityState.Unchanged;

			await _db.Update(poll);
			await _db.Save();
		}
		public async Task Delete(Guid Id)
		{
			await _db.Delete<Poll>(Id);
			await _db.Save();
		}
		public async Task<PollDTO?> Get(Guid Id)
		{
			var poll = await _db.Get<Poll>(Id).Include(x => x.Options).FirstOrDefaultAsync();
			return _mapper.Map<PollDTO>(poll);
		}

		public Task<List<PollDTO>> Get(Expression<Func<Poll, bool>> selector)
		{
			throw new NotImplementedException();
		}

		public async Task<List<PollDTO>> GetAllPollsByPollCollectionId(Guid pollCollectionId)
		{
			List<Poll> polls = await _db.Get<Poll>(x => x.PollCollectionId.Equals(pollCollectionId)).Include(p => p.Options).ToListAsync();
			List<PollDTO> result = new List<PollDTO>();

			foreach (var poll in polls)
			{
				var pollDTO = _mapper.Map<PollDTO>(poll);
				result.Add(pollDTO);
			}
			return result;
		}

		/// <summary>
		/// Set to User Active Session Active Poll
		/// </summary>
		/// <param name="pollId"></param>
		/// <returns></returns>
		public async Task<bool> MakePollActive(Guid pollId)
		{
			var poll = await _db.Get<Poll>(pollId).FirstOrDefaultAsync();
			if (poll is not null)
			{
				var pollCollection = await _db.Get<PollCollection>(poll.PollCollectionId).FirstOrDefaultAsync();
				var session = await _db.Get<Session>(i => i.UserId == pollCollection.UserId && i.IsActive && i.PollCollection.Polls.Contains(poll)).FirstOrDefaultAsync();
				if (session is not null)
				{
					session.ActivePoll = poll;
					await _db.Update(session);
					await _db.Save();
					return true;
				}

				return false;
			}

			return false;
		}
	}
}
