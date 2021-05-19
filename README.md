# OSCar-XML-Chataigne-module-builder
Script to build OSC module values automatically from OSCar XML configuration file.

OSCar is a free VST plugin developped by IRCAM https://forum.ircam.fr/projects/detail/oscar/

The OSCar plugin can be inserted into a DAW (Digital Audio Workstation, such as ProTools, Apple Logic, Digital Performer, Ableton Live, etc.) in order to send/receive parameters’ automation. It is based on the OSC (Open Sound Control) protocol.

To learn more about Chataigne, please visit : http://benjamin.kuperberg.fr/chataigne/

For global support on how to use Chataigne and its modules, please visit the forum : http://benjamin.kuperberg.fr/chataigne/forum or join us on Discord : https://discord.com/invite/ngnJ5z my contact there is also "madees".

# How to use it
First, download the .js script and add it to an OSC Chataigne module.

You'll see some parameters in the script container :
- File browser to select the OSCar XML configuration file
It will uses the object structure defined into it to build values afterwhile.

Next, you can create a single object values, or several at the same time.
- If you want to create only one object, set the index parameter, and click on the first button to add its values to the module.

- If you want to create several objects, set the first/last index parameters, and click on the second button to add objects values to the module. 
