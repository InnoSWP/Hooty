namespace Innohoot.DTO
{
	public class OptionDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public Guid PollId { get; set; }
		public bool IsAnswer { get; set; } = false;
	}
}
