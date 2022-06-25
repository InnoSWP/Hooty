namespace Innohoot.DTO
{
	public class PollDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		public Guid PollCollectionId { get; set; }
		public List<OptionDTO> Options { get; set; }
		public List<Guid>? AnswerId { get; set; }
	}
}
