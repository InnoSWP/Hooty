namespace Innohoot.DTO
{
	public class PollCollectionDTO
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		public DateTime Created { get; set; }
		public List<PollDTO> Polls { get; set; }
	}
}
