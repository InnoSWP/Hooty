using AutoMapper;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class OptionService:IOptionService
	{
		protected readonly IMapper _mapper;
		protected readonly IDBRepository _db;

		public OptionService(IDBRepository repository, IMapper mapper)
		{
			_db = repository;
			_mapper = mapper;
		}
		public async Task<Guid> Create(OptionDTO optionDTO)
		{
			var option = _mapper.Map<Option>(optionDTO);
			//at this moment option.Poll = null
			option.Poll = new Poll(){Id = option.PollId };
			_db.Context.Entry(option.Poll).State = EntityState.Unchanged;
 
			await _db.Add(option);
			await _db.Save();
			return option.Id;
		}
		public async Task Update(OptionDTO optionDTO)
		{
			var option = _mapper.Map<Option>(optionDTO);
			option.Poll = new Poll() {Id = option.PollId};
			_db.Context.Entry(option.Poll).State = EntityState.Unchanged;
				await _db.Update(option);
			await _db.Save();
		}
		public async Task Delete(Guid optionId)
		{
			await _db.Delete<Option>(optionId);
			await _db.Save();
		}
		public async Task<Option?> Get(Guid optionId)
		{
			return await _db.Get<Option>(optionId).FirstOrDefaultAsync();
		}
		public async Task<List<Option>> GetAllOptionsByPollId(Guid pollId)
		{
			return await _db.GetAll<Option>().Where(x => x.PollId.Equals(pollId)).ToListAsync();
		}
	}
}
