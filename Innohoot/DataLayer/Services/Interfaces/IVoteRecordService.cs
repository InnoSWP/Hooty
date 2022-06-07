using Innohoot.Models.ElementsForPA;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IVoteRecordService
{
	Task<List<VoteRecord>?> GetAllVoteRecordByChosenOptionId(Guid optionId);
	Task<Guid> Create(VoteRecord entity);
	Task Delete(Guid entityId);
	Task<VoteRecord?> Get(Guid entityId);
	Task Update(VoteRecord entity);
}