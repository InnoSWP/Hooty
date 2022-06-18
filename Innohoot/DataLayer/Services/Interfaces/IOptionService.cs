using Innohoot.DTO;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IOptionService
{
	public Task<Guid> Create(OptionDTO optionDTO);
	public Task Update(OptionDTO optionDTO);
	public Task Delete(Guid Id);
	public Task<OptionDTO?> Get(Guid Id);
	public Task<List<OptionDTO>> GetAllOptionsByPollId(Guid pollId);
}