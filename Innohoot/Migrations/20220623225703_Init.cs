using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
	public partial class Init : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Users",
				columns: table => new
				{
					Id = table.Column<Guid>(type: "uuid", nullable: false),
					Login = table.Column<string>(type: "text", nullable: false),
					PasswordHash = table.Column<string>(type: "text", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Users", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "PollCollections",
				columns: table => new
				{
					Id = table.Column<Guid>(type: "uuid", nullable: false),
					UserId = table.Column<Guid>(type: "uuid", nullable: false),
					Name = table.Column<string>(type: "text", nullable: false),
					Description = table.Column<string>(type: "text", nullable: true),
					Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_PollCollections", x => x.Id);
					table.ForeignKey(
						name: "FK_PollCollections_Users_UserId",
						column: x => x.UserId,
						principalTable: "Users",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Polls",
				columns: table => new
				{
					Id = table.Column<Guid>(type: "uuid", nullable: false),
					Name = table.Column<string>(type: "text", nullable: false),
					Description = table.Column<string>(type: "text", nullable: true),
					PollCollectionId = table.Column<Guid>(type: "uuid", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Polls", x => x.Id);
					table.ForeignKey(
						name: "FK_Polls_PollCollections_PollCollectionId",
						column: x => x.PollCollectionId,
						principalTable: "PollCollections",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Options",
				columns: table => new
				{
					Id = table.Column<Guid>(type: "uuid", nullable: false),
					Name = table.Column<string>(type: "text", nullable: false),
					PollId = table.Column<Guid>(type: "uuid", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Options", x => x.Id);
					table.ForeignKey(
						name: "FK_Options_Polls_PollId",
						column: x => x.PollId,
						principalTable: "Polls",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Sessions",
				columns: table => new
				{
					Id = table.Column<Guid>(type: "uuid", nullable: false),
					AccessCode = table.Column<string>(type: "text", nullable: true),
					UserId = table.Column<Guid>(type: "uuid", nullable: false),
					Name = table.Column<string>(type: "text", nullable: false),
					Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					StarTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					Duration = table.Column<TimeSpan>(type: "interval", nullable: true),
					PollCollectionId = table.Column<Guid>(type: "uuid", nullable: false),
					IsActive = table.Column<bool>(type: "boolean", nullable: false),
					ActivePollId = table.Column<Guid>(type: "uuid", nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Sessions", x => x.Id);
					table.ForeignKey(
						name: "FK_Sessions_PollCollections_PollCollectionId",
						column: x => x.PollCollectionId,
						principalTable: "PollCollections",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
					table.ForeignKey(
						name: "FK_Sessions_Polls_ActivePollId",
						column: x => x.ActivePollId,
						principalTable: "Polls",
						principalColumn: "Id");
					table.ForeignKey(
						name: "FK_Sessions_Users_UserId",
						column: x => x.UserId,
						principalTable: "Users",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "VoteRecords",
				columns: table => new
				{
					Id = table.Column<Guid>(type: "uuid", nullable: false),
					ParticipantName = table.Column<string>(type: "text", nullable: false),
					OptionId = table.Column<Guid>(type: "uuid", nullable: false),
					SessionId = table.Column<Guid>(type: "uuid", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_VoteRecords", x => x.Id);
					table.ForeignKey(
						name: "FK_VoteRecords_Options_OptionId",
						column: x => x.OptionId,
						principalTable: "Options",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
					table.ForeignKey(
						name: "FK_VoteRecords_Sessions_SessionId",
						column: x => x.SessionId,
						principalTable: "Sessions",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Options_PollId",
				table: "Options",
				column: "PollId");

			migrationBuilder.CreateIndex(
				name: "IX_PollCollections_UserId",
				table: "PollCollections",
				column: "UserId");

			migrationBuilder.CreateIndex(
				name: "IX_Polls_PollCollectionId",
				table: "Polls",
				column: "PollCollectionId");

			migrationBuilder.CreateIndex(
				name: "IX_Sessions_AccessCode",
				table: "Sessions",
				column: "AccessCode",
				unique: true);

			migrationBuilder.CreateIndex(
				name: "IX_Sessions_ActivePollId",
				table: "Sessions",
				column: "ActivePollId");

			migrationBuilder.CreateIndex(
				name: "IX_Sessions_PollCollectionId",
				table: "Sessions",
				column: "PollCollectionId");

			migrationBuilder.CreateIndex(
				name: "IX_Sessions_UserId",
				table: "Sessions",
				column: "UserId");

			migrationBuilder.CreateIndex(
				name: "IX_VoteRecords_OptionId",
				table: "VoteRecords",
				column: "OptionId");

			migrationBuilder.CreateIndex(
				name: "IX_VoteRecords_SessionId",
				table: "VoteRecords",
				column: "SessionId");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "VoteRecords");

			migrationBuilder.DropTable(
				name: "Options");

			migrationBuilder.DropTable(
				name: "Sessions");

			migrationBuilder.DropTable(
				name: "Polls");

			migrationBuilder.DropTable(
				name: "PollCollections");

			migrationBuilder.DropTable(
				name: "Users");
		}
	}
}
