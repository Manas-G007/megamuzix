# Generated by Django 4.1.2 on 2023-08-18 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mid', models.TextField(max_length=500)),
                ('user', models.TextField(max_length=150)),
                ('img_url', models.TextField(max_length=500)),
                ('title', models.TextField(max_length=150)),
                ('name', models.TextField(max_length=150)),
                ('preview_url', models.TextField(max_length=500)),
                ('duration', models.TextField(max_length=100)),
            ],
        ),
    ]
