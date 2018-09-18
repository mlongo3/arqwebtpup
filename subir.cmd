@ECHO OFF
SET /P comentario=Entrar el comentario de subida: 
IF "%comentario%"=="" GOTO Error
	ECHO Subiendo...
	git add . && git commit -m "%comentario%" && git push
GOTO End

:Error
	ECHO Agrega un comentario querido!!!

:End