using AutoMapper;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
			poll.PollCollection = new PollCollection() { Id = poll.PollCollectionId};
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
			var poll = await _db.Get<Poll>(Id).FirstOrDefaultAsync();
			return _mapper.Map<PollDTO>(poll);
		}
		public async Task<List<PollDTO>> GetAllPollsByPollCollectionId(Guid pollCollectionId)
		{
			List<Poll> polls = await _db.GetAll<Poll>().Where(x => x.PollCollectionId.Equals(pollCollectionId)).ToListAsync();
			List<PollDTO> result = new List<PollDTO>();

			foreach (var poll in polls)
			{
				var pollDTO = _mapper.Map<PollDTO>(poll);
				result.Add(pollDTO);
			}
			return result;
		}
	}
}
