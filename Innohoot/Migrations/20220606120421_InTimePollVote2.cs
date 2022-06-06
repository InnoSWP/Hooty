using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
    public partial class InTimePollVote2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Options_Questions_QuestionId",
                table: "Options");

            migrationBuilder.DropForeignKey(
                name: "FK_VoteRecord_Options_ChosenOptionId",
                table: "VoteRecord");

            migrationBuilder.DropForeignKey(
                name: "FK_VoteRecord_Sessions_SessionId",
                table: "VoteRecord");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Options_QuestionId",
                table: "Options");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VoteRecord",
                table: "VoteRecord");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "Options");

            migrationBuilder.RenameTable(
                name: "VoteRecord",
                newName: "VoteRecords");

            migrationBuilder.RenameIndex(
                name: "IX_VoteRecord_SessionId",
                table: "VoteRecords",
                newName: "IX_VoteRecords_SessionId");

            migrationBuilder.RenameIndex(
                name: "IX_VoteRecord_ChosenOptionId",
                table: "VoteRecords",
                newName: "IX_VoteRecords_ChosenOptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VoteRecords",
                table: "VoteRecords",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VoteRecords_Options_ChosenOptionId",
                table: "VoteRecords",
                column: "ChosenOptionId",
                principalTable: "Options",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VoteRecords_Sessions_SessionId",
                table: "VoteRecords",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VoteRecords_Options_ChosenOptionId",
                table: "VoteRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_VoteRecords_Sessions_SessionId",
                table: "VoteRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VoteRecords",
                table: "VoteRecords");

            migrationBuilder.RenameTable(
                name: "VoteRecords",
                newName: "VoteRecord");

            migrationBuilder.RenameIndex(
                name: "IX_VoteRecords_SessionId",
                table: "VoteRecord",
                newName: "IX_VoteRecord_SessionId");

            migrationBuilder.RenameIndex(
                name: "IX_VoteRecords_ChosenOptionId",
                table: "VoteRecord",
                newName: "IX_VoteRecord_ChosenOptionId");

            migrationBuilder.AddColumn<Guid>(
                name: "QuestionId",
                table: "Options",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_VoteRecord",
                table: "VoteRecord",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Options_QuestionId",
                table: "Options",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Options_Questions_QuestionId",
                table: "Options",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VoteRecord_Options_ChosenOptionId",
                table: "VoteRecord",
                column: "ChosenOptionId",
                principalTable: "Options",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VoteRecord_Sessions_SessionId",
                table: "VoteRecord",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id");
        }
    }
}
