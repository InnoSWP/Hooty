using Innohoot.Models.Activity;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IOptionService
{
	Task<List<Option>?> GetAllOptionsByPollId(Guid pollId);
	Task<Guid> Create(Option entity);
	Task Delete(Guid entityId);
	Task<Option?> Get(Guid entityId);
	Task Update(Option entity);
}