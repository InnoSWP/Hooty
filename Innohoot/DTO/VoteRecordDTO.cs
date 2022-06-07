using Innohoot.Models.Activity;

namespace Innohoot.DTO
{
	public class VoteRecordDTO
	{
		public Guid Id { get; set; }
		public string ParticipantName { get; set; }
		public Guid ChosenOption { get; set; }
	}
}
