function Test2()
{
var fin= Aliases.Travio_BackOffice.FindChildEx("Name","*HwndSource: DockWindow*");
var tabbar = fin.FindChildEx("Name", "*ContentControl*",2);
var devices= tabbar.FindChild("WPFControlText","*Схема*",6);
devices.Click();
//WPFObject("HwndSource: DockWindow", "")
//"HwndSource: DockWindow"
  var configurationTabControl = Aliases.Travio_BackOffice.HwndSource_DockWindow.DockWindow.ConfigurationTabControl;
  configurationTabControl.ScrollViewer.VScroll.Pos = 0;
  configurationTabControl.StackPanel.Grid.Combobox.Click(52, 22);

if(b==1)
{

  }

}
