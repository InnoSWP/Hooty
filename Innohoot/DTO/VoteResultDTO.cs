namespace Innohoot.DTO
{
	public class VoteResultDTO
	{
		public Guid PollId { get; set; }
		/// <summary>
		/// OptionId and number of votes for this option
		/// </summary>
		public Dictionary<Guid, int> VoteDistribution { get; set; } = new Dictionary<Guid, int>();

	}
}
