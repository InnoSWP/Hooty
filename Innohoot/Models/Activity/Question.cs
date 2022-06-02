namespace Innohoot.Models.Activity
{
	public class Question:IEntity
	{
		public List<Option> Answers { get; set; }
		public Guid Id { get; set; }
	}
}
