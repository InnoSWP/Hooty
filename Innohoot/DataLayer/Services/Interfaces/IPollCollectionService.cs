using Innohoot.DTO;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IPollCollectionService
{
	Task<Guid> Create(PollCollectionDTO pollCollectionDTO);
	Task Delete(Guid Id);
	Task<PollCollectionDTO?> Get(Guid Id);
	Task Update(PollCollectionDTO pollCollectionDTO);
	Task<List<PollCollectionDTO>> GetAllPollCollectionByUserId(Guid userId);
}