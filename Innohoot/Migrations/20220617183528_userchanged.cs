using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
	public partial class userchanged : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.RenameColumn(
				name: "Name",
				table: "Users",
				newName: "PasswordHash");

			migrationBuilder.AddColumn<string>(
				name: "Login",
				table: "Users",
				type: "text",
				nullable: false,
				defaultValue: "");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "Login",
				table: "Users");

			migrationBuilder.RenameColumn(
				name: "PasswordHash",
				table: "Users",
				newName: "Name");
		}
	}
}
