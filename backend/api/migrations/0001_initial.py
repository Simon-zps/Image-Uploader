# Generated by Django 4.1.7 on 2023-03-12 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='some_image', max_length=200)),
                ('image', models.ImageField(blank=True, default='default.jpg', null=True, upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]