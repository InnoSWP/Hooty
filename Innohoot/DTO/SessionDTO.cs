namespace Innohoot.DTO
{
	public class SessionDTO
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public string Name { get; set; }
		public DateTime Created { get; set; }
		public DateTime? StarTime { get; set; }
		public TimeSpan? Duration { get; set; }
		public bool Available { get; set; } = false;
	}
}
