namespace Innohoot.Models.Activity
{
	public class Option:IEntity
	{
		public string Name { get; set; }
		public Poll Poll { get; set; }
		public Guid Id { get; set; }
	}
}
