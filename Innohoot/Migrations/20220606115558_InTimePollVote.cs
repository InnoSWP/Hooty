using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
    public partial class InTimePollVote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "StarTime",
                table: "Sessions",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Sessions",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "Sessions",
                type: "interval",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Polls",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateTable(
                name: "VoteRecord",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ParticipantName = table.Column<string>(type: "text", nullable: false),
                    ChosenOptionId = table.Column<Guid>(type: "uuid", nullable: true),
                    SessionId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteRecord", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VoteRecord_Options_ChosenOptionId",
                        column: x => x.ChosenOptionId,
                        principalTable: "Options",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VoteRecord_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Polls_UserId",
                table: "Polls",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteRecord_ChosenOptionId",
                table: "VoteRecord",
                column: "ChosenOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteRecord_SessionId",
                table: "VoteRecord",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Polls_Users_UserId",
                table: "Polls",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Polls_Users_UserId",
                table: "Polls");

            migrationBuilder.DropTable(
                name: "VoteRecord");

            migrationBuilder.DropIndex(
                name: "IX_Polls_UserId",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Sessions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StarTime",
                table: "Sessions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Sessions",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Polls",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
