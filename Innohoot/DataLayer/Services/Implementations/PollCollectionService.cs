using AutoMapper;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class PollCollectionService : IPollCollectionService
	{
		protected readonly IMapper _mapper;
		protected readonly IDBRepository _db;

		public PollCollectionService(IDBRepository repository, IMapper mapper)
		{
			_db = repository;
			_mapper = mapper;
		}
		public async Task<Guid> Create(PollCollectionDTO pollCollectionDTO)
		{
			var pollCollection = _mapper.Map<PollCollection>(pollCollectionDTO);

			pollCollection.User = new User() { Id = pollCollection.UserId };
			_db.Context.Entry(pollCollection.User).State = EntityState.Unchanged;

			await _db.Add(pollCollection);
			await _db.Save();
			return pollCollection.Id;
		}
		public async Task Delete(Guid Id)
		{
			await _db.Delete<PollCollection>(Id);
			await _db.Save();
		}
		public async Task<PollCollectionDTO?> Get(Guid Id)
		{
			var pollCollection = await _db.Get<PollCollection>(Id).Include(x => x.Polls).ThenInclude(x => x.Options).FirstOrDefaultAsync();
			return _mapper.Map<PollCollectionDTO>(pollCollection);
		}
		public async Task Update(PollCollectionDTO pollCollectionDTO)
		{
			var pollCollection = _mapper.Map<PollCollection>(pollCollectionDTO);
			pollCollection.User = new User() { Id = pollCollection.UserId };
			_db.Context.Entry(pollCollection.User).State = EntityState.Unchanged;

			await _db.Update(pollCollection);
			await _db.Save();
		}

		public async Task<List<PollCollectionDTO>> GetAllPollCollectionByUserId(Guid userId)
		{
			List<PollCollection> collections = await _db.Get<PollCollection>(x => x.UserId.Equals(userId)).Include(px => px.Polls).ThenInclude(p => p.Options).ToListAsync();
			List<PollCollectionDTO> result = new List<PollCollectionDTO>();

			foreach (var pollCollection in collections)
			{
				var pollCollectionDTO = _mapper.Map<PollCollectionDTO>(pollCollection);
				result.Add(pollCollectionDTO);
			}
			return result;
		}
	}
}
