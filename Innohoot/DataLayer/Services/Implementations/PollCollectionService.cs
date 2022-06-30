using AutoMapper;

using Innohoot.DTO;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;

using Microsoft.AspNetCore.JsonPatch;
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

			pollCollection.Created = DateTime.Now.ToUniversalTime();

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
			var pollCollection = await _db.Get<PollCollection>(Id)
				.Include(z => z.User)
				.Include(x => x.Polls.OrderBy(p => p.OrderNumber))
				.ThenInclude(x => x.Options)
				.OrderBy(x => x.Created)
				.FirstOrDefaultAsync();

			_db.Context.ChangeTracker.Clear();
			return _mapper.Map<PollCollectionDTO>(pollCollection);
		}

		public async Task Update(PollCollectionDTO pollCollectionDTO)
		{
			var pollCollectionInDB = await _db.Get<PollCollection>(pollCollectionDTO.Id)
				.Include(pc => pc.Polls)
				.ThenInclude(p => p.Options)
				.FirstAsync();

			var pollCollection = _mapper.Map<PollCollection>(pollCollectionDTO);

			#region Polls updating/adding/deleting

			_db.Context.Entry(pollCollectionInDB).CurrentValues.SetValues(pollCollection);

			var pollsInDb = pollCollectionInDB.Polls.OrderBy(p => p.OrderNumber);
			int counter = 0;
			foreach (var pollInDB in pollsInDb)
			{
				var poll = pollCollection.Polls.FirstOrDefault(p => p.Id == pollInDB.Id);

				if (poll is not null)
				{
					_db.Context.Entry(pollInDB).CurrentValues.SetValues(poll);
					pollInDB.OrderNumber = counter++;

					#region Options updating/adding/deleting

					var optionsInDB = pollInDB.Options;
					foreach (var optionInDB in optionsInDB)
					{
						var option = poll.Options.FirstOrDefault(o => o.Id == optionInDB.Id);

						if (option is not null)
						{
							_db.Context.Entry(optionInDB).CurrentValues.SetValues(option);
						}
						else
							await _db.Delete(optionInDB);
					}

					foreach (var option in poll.Options)
					{
						if (pollInDB.Options.All(o => o.Id != option.Id))
						{
							await _db.Add(option);
							pollInDB.Options.Add(option);
						}

					}

					#endregion
				}
				else
					await _db.Delete(pollInDB);

			}

			foreach (var poll in pollCollection.Polls)
			{
				if (pollCollectionInDB.Polls.All(p => p.Id != poll.Id))
				{
					poll.OrderNumber = counter++;
					await _db.Add(poll);
					pollCollectionInDB.Polls.Add(poll);
				}
			}

			#endregion


			await _db.Save();
		}

		public async Task UpdatePatch(Guid Id, JsonPatchDocument pollCollectionJsonPatchDocument)
		{
			var pollCollection = await _db.Get<PollCollection>(Id).FirstOrDefaultAsync();
			if (pollCollection is not null)
			{
				pollCollectionJsonPatchDocument.ApplyTo(pollCollection);
				await _db.Save();
			}
		}

		public async Task<List<PollCollectionDTO>> GetAllPollCollectionByUserId(Guid userId)
		{
			List<PollCollection> collections = await _db.Get<PollCollection>(x => x.UserId.Equals(userId))
			.Include(px => px.Polls.OrderBy(p => p.OrderNumber))
			.ThenInclude(p => p.Options)
			.ToListAsync();

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
