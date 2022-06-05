namespace Innohoot.Models.Activity
{
	public class Option:IEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public Guid PollId { get; set; }
		public Poll Poll { get; set; }
	}
}
