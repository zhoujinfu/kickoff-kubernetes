> https://github.com/pyenv/pyenv#usage

### Instsall `pyenv`

```shell
brew update
brew install pyenv
pyenv install 3.10.4
# Running `pyenv install -l` gives the list of all available versions.
pyenv install -l
```

### Switch between Python versions

To select a Pyenv-installed Python as the version to use, run one of tthe following commands:

* `pyenv shell <version>` -- select just for current shell session
* `pyenv local <version>` -- automatically select whenever you are in the current directory (or its subdirectories)
* `pyenv global <version>` -- select globally for your user account
