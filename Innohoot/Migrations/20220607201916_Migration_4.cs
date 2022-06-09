using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
    public partial class Migration_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Polls_Sessions_SessionId",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Sessions");

            migrationBuilder.RenameColumn(
                name: "SessionId",
                table: "Polls",
                newName: "PollCollectionId");

            migrationBuilder.RenameIndex(
                name: "IX_Polls_SessionId",
                table: "Polls",
                newName: "IX_Polls_PollCollectionId");

            migrationBuilder.AddColumn<Guid>(
                name: "PollCollectionId",
                table: "Sessions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "PollCollection",
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
                    table.PrimaryKey("PK_PollCollection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PollCollection_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_PollCollectionId",
                table: "Sessions",
                column: "PollCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_PollCollection_UserId",
                table: "PollCollection",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Polls_PollCollection_PollCollectionId",
                table: "Polls",
                column: "PollCollectionId",
                principalTable: "PollCollection",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_PollCollection_PollCollectionId",
                table: "Sessions",
                column: "PollCollectionId",
                principalTable: "PollCollection",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Polls_PollCollection_PollCollectionId",
                table: "Polls");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_PollCollection_PollCollectionId",
                table: "Sessions");

            migrationBuilder.DropTable(
                name: "PollCollection");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_PollCollectionId",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "PollCollectionId",
                table: "Sessions");

            migrationBuilder.RenameColumn(
                name: "PollCollectionId",
                table: "Polls",
                newName: "SessionId");

            migrationBuilder.RenameIndex(
                name: "IX_Polls_PollCollectionId",
                table: "Polls",
                newName: "IX_Polls_SessionId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Sessions",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Polls_Sessions_SessionId",
                table: "Polls",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id");
        }
    }
}
