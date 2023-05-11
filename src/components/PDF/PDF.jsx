import React from "react";
import {
	Page,
	Document,
	StyleSheet,
	PDFViewer,
	Text,
	View,
	Font,
} from "@react-pdf/renderer";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	DataTableCell,
} from "@david.kucsai/react-pdf-table";
import RobotoRegular from "../../fonts/Roboto-Regular.ttf";
import RobotoBold from "../../fonts/Roboto-Bold.ttf";

Font.register({
	family: "Roboto",
	fonts: [
		{
			src: RobotoRegular,
			format: "truetype",
			fontWeight: 400,
			fontStyle: "normal",
		},
		{
			src: RobotoBold,
			format: "truetype",
			fontWeight: 700,
			fontStyle: "bold"
		},
	],
});

const styles = StyleSheet.create({
	page: {
		fontSize: 11,
		flexDirection: "column",
		padding: 40,
		fontFamily: "Roboto",
	
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		marginBottom:20
	},
	transTitle:{
		fontSize:16,
		marginBottom:16,
		textAlign: "center"
	},  
	info: {
		flexDirection: "column",
		justifyContent: "space-between",
		marginBottom: 10,
		width:400,
		marginLeft:60
	},
	stuInfo: {
		flexDirection: "row",
		marginBottom:5
	},
	infoLabel: {
		flex:0.3,
		fontSize:13
	},
	infoData: {
		flex:0.7,
		fontStyle: "bold",
		fontSize:15
	},
	label: {
		fontSize: 12,
		color: "#808080",
	},
	value: {
		fontSize: 12,
	},
	semester: {
		padding: 10,
	},

});

const Pdf = ({data}) => (


		<Document>
			<Page size="A4" style={styles.page}>
			<Text style={styles.title}>
				{data.uniName}
			</Text>
			<Text style={styles.transTitle}>
				CHỨNG NHẬN KẾT QUẢ HỌC TẬP
			</Text>
			<View style={styles.info}>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>Họ và tên</Text>
					<Text style={styles.infoData}>: {data.stuName}</Text>
				</View>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>Ngày sinh</Text>
					<Text style={styles.infoData}>: {data.dateOfBirth}</Text>
				</View>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>Mã sinh viên</Text>
					<Text style={styles.infoData}>: {data.stuId}</Text>
				</View>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>Khóa/ Lớp</Text>
					<Text style={styles.infoData}>: {data.stuClass}</Text>
				</View>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>Chuyên ngành</Text>
					<Text style={styles.infoData}>: {data.major}</Text>
				</View>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>Hệ đào tạo</Text>
					<Text style={styles.infoData}>: {data.type}</Text>
				</View>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>GPA</Text>
					<Text style={styles.infoData}>: {data.gpa}</Text>
				</View>
				<View style={styles.stuInfo}>
					<Text style={styles.infoLabel}>Xếp loại</Text>
					<Text style={styles.infoData}>: {data.grade}</Text>
				</View>
			</View>

				{
					data.semesters && data.semesters.map((semester,i) =>
						<View style={styles.semester}>
							<Text style={{ fontSize: 14, marginBottom: 10 }}>Học kỳ {i+1}:</Text>
							<Table
								data= {semester}
							>
							<TableHeader textAlign="center">
								<TableCell weighting={0.2}>Mã môn học</TableCell>
								<TableCell weighting={0.5}>Tên môn học</TableCell>
								<TableCell weighting={0.15}>Số tín chỉ</TableCell>
								<TableCell weighting={0.15}>Điểm</TableCell>
							</TableHeader>

							<TableBody textAlign="center">
								<DataTableCell
								weighting={0.2}
								getContent={(r) => r.subjectId}
								/>
								<DataTableCell
								weighting={0.5}
								getContent={(r) => r.subjectName}
								/>
								<DataTableCell weighting={0.15} getContent={(r) => r.credits} />
								<DataTableCell weighting={0.15} getContent={(r) => r.mark} />
							</TableBody>
							</Table>
						</View>
					)
				}
			</Page>
		</Document>

);

export default Pdf;
