namespace Innohoot.DTO
{
	public class UserDTO
	{
		public Guid Id { get; set; }
		public string Login { get; set; }
		public string PasswordHash { get; set; }
	}
}
