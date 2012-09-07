define(['../Excel/Workbook', '../Excel/Table'], function (Workbook, Table) {
	var Template = function () {
		this.workbook = new Workbook();
		this.stylesheet = this.workbook.getStyleSheet();
		
		this.columns = {};
		
		this.predefinedStyles = {
			
		};
		
		this.predefinedFormatters = {
			date: this.stylesheet.createSimpleFormatter('date'),
			currency: this.stylesheet.createFormat({format: "$ #,##0.00;$ #,##0.00;-"}),
			header: this.stylesheet.createFormat({
				font: { bold: true, underline: true},
				alignment: {horizontal: 'center'}
			})
		};
		
		this.worksheet = this.workbook.createWorksheet();
		this.workbook.addWorksheet(this.worksheet);
		this.worksheet.setPageOrientation('landscape');
		this.table = new Table();
		this.table.styleInfo.themeStyle = "TableStyleLight1";
		this.worksheet.addTable(this.table);
		this.workbook.addTable(this.table);
	}
	$.extend(true, Template.prototype, {
		setHeader: function () {
			this.worksheet.setHeader.apply(this.worksheet, arguments);
		},
		setFooter: function () {
			this.worksheet.setFooter.apply(this.worksheet, arguments);
		},
		prepare: function () {
			return this.workbook;
		},
		
		setData: function (worksheetData) {
			this.worksheet.setData(worksheetData);
			this.data = worksheetData;
			this.table.setReferenceRange([1, 1], [this.columns.length, worksheetData.length]);
		},
		
		setColumns: function (columns) {
			this.columns = columns;
			this.worksheet.setColumns(columns);
			this.table.setTableColumns(columns);
			this.table.setReferenceRange([1, 1], [this.columns.length, this.data.length]);
		}
	});
	return Template;
});
