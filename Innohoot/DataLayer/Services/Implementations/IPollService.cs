using Innohoot.Models.Activity;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IPollService
{
	Task<Guid> Create(Poll poll );
	Task Delete(Guid pollId);
	Task<Poll?> Get(Guid pollId);
	Task<List<Poll>?> GetAllPollsByUserId(Guid userId);
	Task Update(Poll poll);
}