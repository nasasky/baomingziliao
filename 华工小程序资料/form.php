<?php
 
 
$con=mysqli_connect("129.28.67.152","root","123456","nasasky_com_cn"); 
if (!$con)
  {
  die('Could not connect: ' . mysqli_connect_error());
  }
 
 
mysqli_query($con,"set names utf8");
 
 
if (!empty($_POST['xingming'])&&!empty($_POST['xingbie'])&&!empty($_POST['aihao'])){
	$sql="INSERT INTO person (xingming, xingbie, aihao) VALUES ('$_POST[xingming]','$_POST[xingbie]','$_POST[aihao]')";
	
	
	$result = mysqli_query($con,$sql);
	if (!$result)
	  {  
		die('Error: ' . mysqli_connect_error());
	 }
 
}
 
 
 
 
  $sql1 = "SELECT * FROM person";
  $result1 = mysqli_query($con,$sql1);
  
 
  
?>
 
<!doctype html>
<html lang="zh-cn">
<head>
<meta charset="utf-8">
 
 
<title>��</title>
</head>
 
<body style="margin:50px;">
 
<script language="JavaScript"> 
function myrefresh() 
{ 
window.location.reload(); 
} 
setTimeout('myrefresh()',10000); //ָ��1��ˢ��һ�� 
</script> 
 
 
<table style='text-align:left;' border='1'>
         <tr><th>id</th><th>����</th><th>�Ա�</th><th>����</th></tr>
<?php
     while ($bookInfo = mysqli_fetch_array($result1,MYSQLI_ASSOC)){ //���ز�ѯ���������
			$xingming = $bookInfo["xingming"]; //�����ݴ�����ȡ��
			$xingbie = $bookInfo["xingbie"];
			$aihao = $bookInfo["aihao"];
			$id = $bookInfo["id"];
              echo "<tr><td>{$id}</td><td>{$xingming}</td><td>{$xingbie}</td><td>{$aihao}</td></tr>";
     }
	 
//�ͷŽ����
mysqli_free_result($result1);
 
mysqli_close($con);
?>
</table>
 
 
</body>
</html>