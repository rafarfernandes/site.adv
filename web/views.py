from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_protect
import json

def index(request):
    return render(request, 'index.html')



@csrf_protect  # Mantendo a proteção CSRF
def enviar_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Captura e sanitização dos dados
            nome = data.get('name', '').strip()
            telefone = data.get('phone', '').strip()
            email_cliente = data.get('email', '').strip()
            assunto = data.get('subject', '').strip()
            mensagem = data.get('message', '').strip()

            # Validações básicas
            if not all([nome, telefone, email_cliente, assunto, mensagem]):
                return JsonResponse({'status': 'error', 'message': 'Todos os campos são obrigatórios.'}, status=400)

            # Validação de e-mail
            try:
                validate_email(email_cliente)
            except ValidationError:
                return JsonResponse({'status': 'error', 'message': 'E-mail inválido.'}, status=400)

            # Criando o corpo do e-mail
            corpo_email = f"""
            Nome: {nome}
            Telefone: {telefone}
            E-mail: {email_cliente}
            Assunto: {assunto}
            Mensagem: {mensagem}
            """

            # Criando e enviando o e-mail
            email = EmailMessage(
                subject='Novo Contato do Site',
                body=corpo_email,
                from_email='marcusalgadoadvogados@gmail.com',
                to=['marcusalgadoadvogados@gmail.com'],
                reply_to=[email_cliente],
            )
            email.send(fail_silently=False)

            return JsonResponse({'status': 'success', 'message': 'E-mail enviado com sucesso!'})
        
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': 'Erro interno no servidor.'}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)