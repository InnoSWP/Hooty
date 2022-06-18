using Innohoot.DTO;
using Innohoot.Models.ElementsForPA;

namespace Innohoot.DataLayer.Services.Implementations;

public interface IVoteRecordService
{
	/// <summary>
	/// Add a new vote that came from a participant
	/// </summary>
	/// <param name="voteRecordDTO"></param>
	/// <returns></returns>
	Task<Guid> AddVoteRecord(VoteRecordDTO voteRecordDTO);

	Task<List<VoteRecord>> GiveVotesBySessionId(Guid sessionId);
	Task<List<VoteRecord>> GiveVotesBySessionAndPollId(Guid sessionId, Guid pollId);

	/// <summary>
	/// Select voteRecord by poll and active session and return data in dictionary 
	/// </summary>
	/// <param name="userId"></param>
	/// <param name="pollId"></param>
	/// <returns></returns>
	Task<VoteResultDTO?> GiveVoteResult(Guid userId, Guid pollId);
}