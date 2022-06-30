using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
	public partial class ParticipantListInSession : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<List<string>>(
				name: "ParticipantList",
				table: "Sessions",
				type: "text[]",
				nullable: true);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "ParticipantList",
				table: "Sessions");
		}
	}
}
