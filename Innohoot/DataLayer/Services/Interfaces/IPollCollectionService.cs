using Innohoot.DTO;
using Microsoft.AspNetCore.JsonPatch;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IPollCollectionService
{
	Task<Guid> Create(PollCollectionDTO pollCollectionDTO);
	Task Delete(Guid Id);
	Task<PollCollectionDTO?> Get(Guid Id);
	Task Update(PollCollectionDTO pollCollectionDTO);
	Task UpdatePatch(Guid Id, JsonPatchDocument pollCollectionJsonPatchDocument);
	Task<List<PollCollectionDTO>> GetAllPollCollectionByUserId(Guid userId);
}