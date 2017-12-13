from building import *

cwd     = GetCurrentDir()
src     = Glob('*.c')
CPPPATH = [cwd]
group   = DefineGroup('WebTerminal', src, depend = ['PKG_USING_WEBTERMINAL'], CPPPATH = CPPPATH)

Return('group')
