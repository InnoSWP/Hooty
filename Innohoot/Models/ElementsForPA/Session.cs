namespace Innohoot.Models.Activity
{
	public class Session:IEntity
	{
		public Guid UserId { get; set; }
		public string Name { get; set; }
		public DateTime Created { get; set; }
		public DateTime StarTime	{ get; set; }

		//public SpanTime Duration 
		public string Description { get; set; }
		public List<Poll> Polls { get; set; }
		public bool Available { get; set; } = false;
		public Guid Id { get; set; }
	}
}
