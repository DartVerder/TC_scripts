var params = require("Params");

function Start()
{
  if(!(Sys.WaitProcess("Travio.BackOffice", 5).Exists))
  { 
    TestedApps.Travio_BackOffice1.Run(1, true);//TestedApps.runall();//1 проект - 1 приложение
    var StartTravio=Sys.WaitProcess("Travio.BackOffice", 5000).Exists;
    if(StartTravio)
    {
      Log.Message("Succes starting Travio.BackOffice"); 
    }
    else
    {
      Log.Error("Travio.BackOffice not starting.")
    }
  }
  else{
    Log.Message("Travio.BackOffice already started")
  }
}

function Auth()
{
Start();
var wasAuth=Sys.Process("Travio.BackOffice").WaitWPFObject("HwndSource: DockWindow", "", 5).Exists;

  if(!wasAuth)
   { 
   let authWindow = Sys.Process("Travio.BackOffice").FindChildEx("ClrFullClassName","*LoginView*",8);
   let name=authWindow.FindChildEx("WPFControlName","*loginTextBox*",2);
   let password=authWindow.FindChildEx("Name","*Passwordwatermarktextbox*",2);
   let id=params.m_auth.id;
   let boolpass=params.m_auth.bool_pass;
   let login_button=authWindow.FindChild("Name","*Button*Вход*",2);
   name.Click();
   name.Keys(params.m_auth.name[id]);
   password.Click();
   password.Keys(params.m_auth.password[Number(boolpass)]);
   login_button.Click();
   
   wasAuth = Sys.Process("Travio.BackOffice").WaitWPFObject("HwndSource: DockWindow", "", 5000).Exists;
   if(wasAuth)
   {
     Log.Message("Authentication of " +params.m_auth.name[id] +" was success.");
   }
   else
   {
     Log.Error("Authentication of "+params.m_auth.name[id] + " was failed.");
   }
  }
  else
    Log.Message("BackOffice already logined.");
 }

function ServicesCheck()
{
  let wait = 0;
  let flag;
  let services = ["Travio.DetectionServer","o2kTimeAdjust","RecogSvr","Travio.WatchdogService","CCTV.Framework.Rules.Provider.ServicePublisher"];
 
 for(let i = 0; i < services.length;i++)
 {
   flag=  Sys.WaitProcess(services[i],wait).Exists;
   if(flag)
 {
   Log.Message("Service "+ services[i]+" is working");
 }
  else{
    Log.Warning("Service "+ services[i]+ " isn't working")
  }
 }
 
}

function CheckTabs()
{
Log.CreateFolder("Testing of tabs");
  Start();
  Auth();
  let id = params.m_auth.id;
  let uptab = Sys.Process("Travio.BackOffice").WaitWPFObject("HwndSource: DockWindow", "", 0).FindAllChildren("Name", "*ContentPresenter*",3);
  Log.Message("Check for "+params.m_auth.name[id]);
  let tab = Sys.Process("Travio.BackOffice").WaitWPFObject("HwndSource: DockWindow", "", 0).FindAllChildren("Name","*ConfigurationTabItem*",9);
  
  if((id<=1 && uptab.length==4)||(id==2 && uptab.length==3))
  {Log.Message("Upper tabs is ok")}
  else 
  {Log.Warning("Upper tabs is uncorrect")}
  let tmp_map=params.tab_map;
  let tab_name;
  for(let key of tab)
  {
  
  tab_name=key.WPFControlText;
  let access = tmp_map.get(tab_name);
    if(((id==1) &&(access==id ||access==3 ))
    ||((id!=1) && (access>=id && access<=3)))
    {
      tmp_map.delete(tab_name);
    }
    else
    {
      Log.Warning("not recognized or identified tab \"" + tab_name+"\" for "+ params.m_auth.name[id])
    }
  }
  for (let havnt of tmp_map.values())
  {
  if((id==1 && (havnt ==1 || havnt ==3))||(id!=1 && havnt>=id ))

     {
       for(let misstab of tmp_map.keys())
       {
       if(havnt==tmp_map.get(misstab))
         Log.Warning("Missing tab \""+misstab+"\"");
       }
     }
  }
  /*
    case 1:{
      if(uptab.length ==3)
       {return true}
       else {return false}
      break;}
    default: Log.Warning("Undefined user")
  }*/
 
//WPFControlText
  
}

function test()
{
  Aliases.explorer.wndProgman.SHELLDLL_DefView.FolderView.ClickItem("Настройка параметров системы ФВФ", 0);
  TestedApps.Travio_BackOffice1.Run(1, true);
}