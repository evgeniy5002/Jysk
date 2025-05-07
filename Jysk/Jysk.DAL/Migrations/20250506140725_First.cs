using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Jysk.DAL.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "T_Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "T_Manufacturer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Manufacturer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "T_Storage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sum = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Storage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "T_User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "T_WorkHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Day = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Start = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    End = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_WorkHours", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "T_Product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Delivery = table.Column<bool>(type: "bit", nullable: false),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Discount = table.Column<int>(type: "int", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Product", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Product_T_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "T_Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_Product_T_Manufacturer_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "T_Manufacturer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Delivery",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StorageId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    Sum = table.Column<int>(type: "int", nullable: false),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Delivery", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Delivery_T_Manufacturer_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "T_Manufacturer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_Delivery_T_Storage_StorageId",
                        column: x => x.StorageId,
                        principalTable: "T_Storage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Client",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sum = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Client", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Client_T_User_UserId",
                        column: x => x.UserId,
                        principalTable: "T_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Employee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Employee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Employee_T_User_UserId",
                        column: x => x.UserId,
                        principalTable: "T_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Store",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HouseNumber = table.Column<int>(type: "int", nullable: false),
                    TotalProductSum = table.Column<int>(type: "int", nullable: false),
                    StorageId = table.Column<int>(type: "int", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkHoursId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Store", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Store_T_Storage_StorageId",
                        column: x => x.StorageId,
                        principalTable: "T_Storage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_Store_T_WorkHours_WorkHoursId",
                        column: x => x.WorkHoursId,
                        principalTable: "T_WorkHours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Review",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Review", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Review_T_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "T_Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Supply",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Supply", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Supply_T_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "T_Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Order",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false),
                    ProductionPrice = table.Column<int>(type: "int", nullable: false),
                    FinalPrice = table.Column<int>(type: "int", nullable: false),
                    MarkUp = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    ClientId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Order_T_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "T_Category",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_T_Order_T_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "T_Client",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_T_Order_T_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "T_Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_Order_T_User_UserId",
                        column: x => x.UserId,
                        principalTable: "T_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "T_Cargo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    StorageToId = table.Column<int>(type: "int", nullable: false),
                    StorageFromId = table.Column<int>(type: "int", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Cargo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_Cargo_T_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "T_Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_Cargo_T_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "T_Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_Cargo_T_Storage_StorageFromId",
                        column: x => x.StorageFromId,
                        principalTable: "T_Storage",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_T_Cargo_T_Storage_StorageToId",
                        column: x => x.StorageToId,
                        principalTable: "T_Storage",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "T_WriteOff",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    StorageId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sum = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_WriteOff", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_WriteOff_T_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "T_Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_WriteOff_T_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "T_Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_T_WriteOff_T_Storage_StorageId",
                        column: x => x.StorageId,
                        principalTable: "T_Storage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_T_Cargo_EmployeeId",
                table: "T_Cargo",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Cargo_ProductId",
                table: "T_Cargo",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Cargo_StorageFromId",
                table: "T_Cargo",
                column: "StorageFromId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Cargo_StorageToId",
                table: "T_Cargo",
                column: "StorageToId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Client_UserId",
                table: "T_Client",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Delivery_ManufacturerId",
                table: "T_Delivery",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Delivery_StorageId",
                table: "T_Delivery",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Employee_UserId",
                table: "T_Employee",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Order_CategoryId",
                table: "T_Order",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Order_ClientId",
                table: "T_Order",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Order_ProductId",
                table: "T_Order",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Order_UserId",
                table: "T_Order",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Product_CategoryId",
                table: "T_Product",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Product_ManufacturerId",
                table: "T_Product",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Review_ProductId",
                table: "T_Review",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Store_StorageId",
                table: "T_Store",
                column: "StorageId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Store_WorkHoursId",
                table: "T_Store",
                column: "WorkHoursId");

            migrationBuilder.CreateIndex(
                name: "IX_T_Supply_ProductId",
                table: "T_Supply",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_T_WriteOff_EmployeeId",
                table: "T_WriteOff",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_T_WriteOff_ProductId",
                table: "T_WriteOff",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_T_WriteOff_StorageId",
                table: "T_WriteOff",
                column: "StorageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "T_Cargo");

            migrationBuilder.DropTable(
                name: "T_Delivery");

            migrationBuilder.DropTable(
                name: "T_Order");

            migrationBuilder.DropTable(
                name: "T_Review");

            migrationBuilder.DropTable(
                name: "T_Store");

            migrationBuilder.DropTable(
                name: "T_Supply");

            migrationBuilder.DropTable(
                name: "T_WriteOff");

            migrationBuilder.DropTable(
                name: "T_Client");

            migrationBuilder.DropTable(
                name: "T_WorkHours");

            migrationBuilder.DropTable(
                name: "T_Employee");

            migrationBuilder.DropTable(
                name: "T_Product");

            migrationBuilder.DropTable(
                name: "T_Storage");

            migrationBuilder.DropTable(
                name: "T_User");

            migrationBuilder.DropTable(
                name: "T_Category");

            migrationBuilder.DropTable(
                name: "T_Manufacturer");
        }
    }
}
