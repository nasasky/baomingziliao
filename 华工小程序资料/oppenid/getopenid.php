<?php
text();
function text()
{
    $code = $_GET['code'];//С��������codeֵ
    $nick = $_GET['nick'];//С���������û��ǳ�
    $imgUrl = $_GET['avaurl'];//С���������û�ͷ���ַ
    $sex = $_GET['sex'];//С���������û��Ա�
    $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb26d9c5e3ce6b971&secret=7d067012ed03fe02dd08e926db79bc44&js_code=' . $code . '&grant_type=authorization_code';
    //yourAppidΪ������appid.appSecretΪ�����ߵ�appsecret,�����Դ�΢�Ź���ƽ̨��ȡ��
    $info = file_get_contents($url);//����HTTPs���󲢻�ȡ���ص����ݣ��Ƽ�ʹ��curl
    $json = json_decode($info);//��json���ݽ���
    $arr = get_object_vars($json);
    $openid = $arr['openid'];
    $session_key = $arr['session_key'];
    $con = mysqli_connect('localhost', 'root', '123456');//�������ݿ�
    if ($con) {
        if (mysqli_select_db($con, 'nasasky_com_cn')) {
            $sql1 = "select * from weixin where openid = '$openid'";
            $result = mysqli_query($con, $sql1);
            $result = mysqli_fetch_assoc($result);
            if ($result!=null) {//������ݿ��д��ڴ��û�����Ϣ������Ҫ���»�ȡ
                $result = json_encode($result);
                echo $result;
            }
            else {//û�������ݴ������ݿ�
                if ($sex == '0') {
                    $sex = 'none';
                } else {
                    $sex = '1' ? 'man' : 'women';
                }
                $sql = "insert into weixin values ('$nick','$openid','$session_key','$imgUrl','$sex')";
                if (mysqli_query($con, $sql)) {
                    $arr['nick'] = $nick;
                    $arr['imgUrl'] = $imgUrl;
                    $arr['sex'] = $sex;
                    $arr = json_encode($arr);
                    echo $arr;
                } else {
                    die('failed' . mysqli_error($con));
                }
            }
        }
    } else {
        die(mysqli_error());
    }
}
 
?>
