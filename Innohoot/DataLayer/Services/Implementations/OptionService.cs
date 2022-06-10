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
		public async Task Delete(Guid Id)
		{
			await _db.Delete<Option>(Id);
			await _db.Save();
		}
		public async Task<OptionDTO?> Get(Guid Id)
		{
			var option = await _db.Get<Option>(Id).FirstOrDefaultAsync();
			return _mapper.Map<OptionDTO>(option);
		}
		public async Task<List<OptionDTO>> GetAllOptionsByPollId(Guid pollId)
		{
			List<Option> options = await _db.GetAll<Option>().Where(x => x.PollId.Equals(pollId)).ToListAsync();
			List<OptionDTO> result = new List<OptionDTO>();

			foreach (var option in options)
			{
				var optionDTO = _mapper.Map<OptionDTO>(option);
				result.Add(optionDTO);
			}
			return result;
		}
	}
}
