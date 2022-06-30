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

	Task<List<VoteRecord>> GetVotesBySessionId(Guid sessionId);
	Task<List<VoteRecord>> GetVotesBySessionAndPollId(Guid sessionId, Guid pollId);

	/// <summary>
	/// Select voteRecord by poll and active session and return data in dictionary 
	/// </summary>
	/// <param name="userId"></param>
	/// <param name="pollId"></param>
	/// <returns></returns>
	Task<VoteResultDTO?> GetVoteResult(Guid userId, Guid pollId);

	Task<List<VoteRecord>> GetVotesByParticipant(Guid sessionId, string participantName);
	Task<VoteRecord?> GetVoteByParticipant(Guid pollId, string participantName);
	Task<Dictionary<string, int>> GetTopParticipants(Guid sessionId);
}