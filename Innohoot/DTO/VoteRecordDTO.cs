namespace Innohoot.DTO
{
	public class VoteRecordDTO
	{
		public Guid Id { get; set; }
		public string ParticipantName { get; set; }
		public Guid OptionId { get; set; }
		public Guid SessionId { get; set; }
	}
}
