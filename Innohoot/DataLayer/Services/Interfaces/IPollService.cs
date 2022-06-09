using Innohoot.DTO;
using Innohoot.Models.Activity;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IPollService
{
	Task<Guid> Create(PollDTO pollDTO);
	Task Update(PollDTO pollDTO);
	Task Delete(Guid pollId);
	Task<Poll?> Get(Guid pollId);
	Task<List<Poll>> GetAllPollsByPollCollectionId(Guid userId);
}