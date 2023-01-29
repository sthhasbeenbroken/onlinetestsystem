<template>
    

<div class="layui-row">
    <div class="layui-col-xs7 layui-col-md-offset3" align="center">
        <div style="margin: 0,auto; width: 800px;height: 80px;">
            <div style="margin: 0,auto;height: 80px;text-align:center;line-height:80px;font-size: 40px;color: #000000">
                人脸录入
            </div>
        </div>
        <div style="color:#FFFFFF;height: 50px;margin-top:20px;margin-left:20px;margin-right:20px;background-color: #5A5B5B;border-radius:5px">
            <label style="margin-left: 180px;height: 50px;line-height:50px;font-size: 21px;text-align: right;float: left">姓名：</label>

            <input style="width:300px;margin-left: -100px;height: 50px;font-size: 21px;background-color: #5a5b5b;color:#FFFFFF;border: 0px;"
                  placeholder="在此输入姓名" type="text" name="userName" id="userName">
        </div>

        <div id="mainDiv">
           
        </div>
        <div>
            <table frame="void" >
                <tr>
                    <td><button title="摄像头注册" value="摄像头注册" onclick="getMedia()" style="color:#FFFFFF;height: 30px;display:block;margin:0 auto;margin-top:10px;width:120px;background-color: #3F51B5;border-radius:5px;text-align: center;line-height: 30px;font-size: 20px" >摄像头注册</button></td>
                    <td><button style="color:#FFFFFF;height: 30px;display:block;margin:0 auto;margin-top:10px;width:120px;background-color: #3F51B5;border-radius:5px;text-align: center;line-height: 30px;font-size: 20px" onclick="imageRecog()">照片注册</button></td>
                </tr>
                <!--<td><button id="snap" onclick="commitPhoto()" style="color:#FFFFFF;height: 30px;display:block;margin:0 auto;margin-top:10px;width:100px;background-color: #3F51B5;border-radius:5px;text-align: center;line-height: 30px;font-size: 20px">照片提交</button></td>-->
                <tr><td colspan="2"><button id="snap" onclick="takePhoto()"  style="color:#FFFFFF;height: 30px;display:block;margin:0 auto;margin-top:10px;width:100px;background-color: #3F51B5;border-radius:5px;text-align: center;line-height: 30px;font-size: 20px">提交</button></td></tr>
            </table>
        </div>
        <div style="float: right">

        </div>
    </div>


</div>
</template>
