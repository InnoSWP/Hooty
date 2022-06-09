using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
    public partial class PollCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Polls_PollCollection_PollCollectionId",
                table: "Polls");

            migrationBuilder.DropForeignKey(
                name: "FK_Polls_Users_UserId",
                table: "Polls");

            migrationBuilder.DropIndex(
                name: "IX_Polls_UserId",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Polls");

            migrationBuilder.AlterColumn<Guid>(
                name: "PollCollectionId",
                table: "Polls",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Polls_PollCollection_PollCollectionId",
                table: "Polls",
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

            migrationBuilder.AlterColumn<Guid>(
                name: "PollCollectionId",
                table: "Polls",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Polls",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Polls_UserId",
                table: "Polls",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Polls_PollCollection_PollCollectionId",
                table: "Polls",
                column: "PollCollectionId",
                principalTable: "PollCollection",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Polls_Users_UserId",
                table: "Polls",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
