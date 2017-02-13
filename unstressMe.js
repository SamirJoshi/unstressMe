function HelloWorld(){
  
}

function WriteToFile() {

    var fso = CreateObject("Scripting.FileSystemObject");  
    var s = fso.CreateTextFile("C:\\Test.txt", true);
    var text=document.getElementById("stressForm").innerText;
    s.Close();
 }

