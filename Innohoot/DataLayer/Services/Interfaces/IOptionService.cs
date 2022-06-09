using Innohoot.DTO;
using Innohoot.Models.Activity;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IOptionService
{
	public Task<Guid> Create(OptionDTO optionDTO);
	public Task Update(OptionDTO optionDTO);
	public Task Delete(Guid optionId);
	public Task<Option?> Get(Guid optionId);
	public Task<List<Option>> GetAllOptionsByPollId(Guid pollId);
}