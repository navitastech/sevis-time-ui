## ATDD Cucumber/Selenium/Ruby
### Languages and Technologies
- Ruby (or Java)
- Selenium
- Cucumber/Gherkin
- Text Editor or IDE (SublimeText, Atom, Notepad++, Eclipse)
- Firefox 45

### Quick Start Guide
## Selenium Grid
### Resources
https://www.npmjs.com/package/selenium-standalone
### Installation
Run the following commands to install. This is currently installed on the remote computer.
```
$> npm install selenium-standalone@latest -g
$> selenium-standalone install
```
### Starting the Selenium Grid
Start the selenium grid and ensure IE 32-bit architecture is specified
```
$> selenium-standalone start --drivers.ie.arch=ia32
```
### Connection Information
The selenium grid can be reached from the test suite at:
```
http://nemselapp001:4444/wd/hub ?

#### Browser Setup
Install Firefox version 45.0: https://ftp.mozilla.org/pub/firefox/releases/45.0/ <br/>
##### Note: Later versions of Firefox may not support Selenium.
Select your OS, then select en-US.

Note: On Windows, if FF is installed in a non standard location (i.e. outside Program Files) the you must add the FF directory to your PATH environment variables in Windows.

#### Mac Installation
Install Ruby & Cucumber:
```
$> brew install ruby
$> gem install bundler
$> sudo gem install selenium-webdriver
$> gem install cucumber
$> gem install rspec
```

#### Windows Installation
Use the Windows Ruby Installer: http://rubyinstaller.org/

* Download RubyInstaller for Ruby 2.2.4
* Install in a directory *that does not contain spaces in its path* (such as C:\Ruby, but not C:\Program Files\Ruby)
* Download the Ruby Development Kit (RDK) for your associated Ruby Installer at http://rubyinstaller.org/downloads/ in the section labeled "Development Kit"
* Run the RDK installer and extract it somewhere permanent (for convenience, consider extracting it in the same directory as where you installed Ruby)
* Navigate to the DevKit via command prompt and execute the following two commands:

```
$> ruby dk.rb init
$> ruby dk.rb install
```

* To verify everything works, try installing the necessary gems:

```
$> gem install bundler
$> gem install selenium-webdriver
$> gem install cucumber
```

(Instructions sourced from https://github.com/oneclick/rubyinstaller/wiki/Development-Kit

#### Linux (Ubuntu) Installation
Install Ruby:<br/>
http://tecadmin.net/install-ruby-on-rails-on-ubuntu/
```
$> gem install bundler
$> sudo apt-get install ruby-dev
$> sudo gem install selenium-webdriver
$> gem install cucumber
$> gem install rspec
```
Install headless Xvfb Firefox Browser:<br/>
http://www.installationpage.com/selenium/how-to-run-selenium-headless-firefox-in-ubuntu/

#### Running Cucumber
`$> cucumber`

(run from the /test directory)

### References
* https://cucumber.io/docs/reference
* http://docs.behat.org/en/v2.5/guides/1.gherkin.html
* https://blog.codecentric.de/en/2013/08/cucumber-setup-basics/
* http://stackoverflow.com/questions/14700123/selenium-webdriver-ruby-how-to-wait-for-images-to-be-fully-loaded-after-clic
* http://stackoverflow.com/questions/7667001/how-do-you-check-the*page-for-text-using-selenium-2-and-firefox
* https://www.relishapp.com/cucumber/cucumber/docs/writing-support-code/before-hook
* http://gregbee.ch/blog/effective-api-testing-with-cucumber
