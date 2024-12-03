import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  ButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./TemplateReplies.css";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { copyToClipboard, useMediaQueries } from "../../utils/functions";
import { Delete, EditNote } from "@mui/icons-material";
import NewReplyDialog from "./dialogs/NewReplyDialog";
import EditReplyDialog from "./dialogs/EditReplyDialog";
import DeleteReplyDialog from "./dialogs/DeleteReplyDialog";
import { useDispatch, useSelector } from "react-redux";
import { setEditReply, setReplies } from "../../rtk/slices/utils-slice";
import TelegramIcon from "../../components/Icons/TelegramIcon";

const TemplateReplies = () => {
  const dispatch = useDispatch();
  const utilsStore = useSelector((state) => state.utils);
  const { replies } = utilsStore;

  const content = [
    {
      title: "كل التفاصيل",
      text: "أهلا بحضرتك في إنجليزي بالمعلقة مع مستر عمر حمدي 🙋🏻‍♂️🥳\n\nكورس التأسيس هيبدأ أول 6 إن شاء الله ⌛️ وهو عبارة عن كورس أساسيات مستر عمر بيبدأ فيه مع الطلاب من الصفر طوبة طوبة 🧱 🏗 متاح اونلاين وفي المكان حسب المناسب لحضرتك 🗺 🌐\n\nمدة الكورس شهر، ثمانية محاضرات، بواقع محاضرتين في الأسبوع، ومدة المحاضرة من ساعة لساعة ونصف حسب احتياج المادة العلمية 📚\n\nوالحد الأقصى للطلاب في المجموعة 10 طلاب 👥️\n\nومكان الكورس 📌\n- في المعادي: شارع 151، مبنى 4 (عمارة بنك كريديه أجريكول)، الدور ال11، بداخل شركة إبداع كابيتال. ويمكن الوصول للمكان من ميدان الحرية ومحطة مترو المعادي.\n\n- في الدقي: 20 شارع الشاطوري متفرع من شارع الدقي\n\n* ومتاح أونلاين، بطريقتنا الخاصة والتي تكون بنفس كفاءة وتفاعل الوجه لوجه\n\nسعر الكورس للفرد الواحد 800ج شامل المواد العلمية 📖\nومتاح خصم خاص جدًا للمجموعات 💰\n\n🤯 الأماكن محدودة جدا 🤯 فلو حضراتكم عايزين تلحقوا تحجزوا قبل ما الأماكن تكتمل 🔒 أو حابين تعرفوا معلومات أكتر 🤔 يُرجى ترك رقم الهاتف 📞 وسوف يقوم أحد ممثلي خدمة العملاء بالتواصل معكم للرد على كافة الاستفسارات ✅️",
    },
    {
      title: "مكان الكورس",
      text: "مكان الكورس 📌\n\n- في المعادي: شارع 151، مبنى 4 (عمارة بنك كريديه أجريكول)، الدور ال11، بداخل شركة إبداع كابيتال. ويمكن الوصول للمكان من ميدان الحرية ومحطة مترو المعادي.\n\n- في الدقي: 20 شارع الشاطوري متفرع من شارع الدقي\n\n* ومتاح أونلاين، بطريقتنا الخاصة والتي تكون بنفس كفاءة وتفاعل الوجه لوجه\n",
    },
    {
      title: "سعر الكورس",
      text: "سعر الكورس للفرد الواحد 800ج شامل المواد العلمية 📖\nومتاح خصم خاص جدًا للمجموعات 💰",
    },
    {
      title: "الدروس هتبدأ امتى؟",
      text: "إن شاء الله:\nكورس التأسيس هيبدأ الشهر الجاي (يونيو) ومتاح الحجز لحد 31 / 5\n\nأما دروس الثانوية العامة (3 ثانوي) فهتبدأ في شهر 8",
    },
    {
      title: "مدة الكورس",
      text: "مدة الكورس شهر، ثمانية محاضرات، بواقع محاضرتين في الأسبوع، ومدة المحاضرة من ساعة لساعة ونصف حسب احتياج المادة العلمية 📚",
    },
    {
      title: "دعوة للحجز والحصول على رقم",
      text: "🤯 الأماكن محدودة جدا 🤯 فلو حضراتكم عايزين تلحقوا تحجزوا قبل ما الأماكن تكتمل 🔒 أو حابين تعرفوا معلومات أكتر 🤔 يُرجى ترك رقم الهاتف 📞 وأ. منار هتتواصل معكم للرد على كافة الاستفسارات ✅️\n\nوممكن تتواصلوا معانا على الرقم دا:\n01070284188",
    },
    {
      title: "فيه شهادات معتمدة؟",
      text: "لا يا فندم، لأن الكورس مش كورس أيلتس أو توفل، وإنما كورس تأسيسي في اللغة.\n\nالشهادات المعتمدة بتكون لكورسات الطلاقة في اللغة وال بيقدمها بشكل حصري المجلس الثقافي البريطاني والجامعة الأمريكية بالقاهرة.\n\nوأي أكاديمية بتدعي إنها بتقدم الشهادات دي فدا مش بيكون صحيح يا فندم وبتكون شهادات تقدير أو إثبات لحضور وإتمام الدورة التعليمية مش أكتر.\n\nفي الواقع الشهادات الصادرة عن المجلس الثقافي البريطاني أو الجامعة الأمريكية أو وكلائهم هي كمان شهادات مؤقتة بيكون لها مدة صلاحية للتقديم بيها في سفارات الدول الأجنبية والمؤسسات الجامعية، وبعد انتهاء مدة صلاحية الشهادة بيكون الطالب محتاج يعيد الامتحان مرة تانية لو حب يستخرج الشهادة دي لاستخدامها في شيء آخر.",
    },
  ];

  const [dialogsState, setDialogsState] = useState({
    newReply: false,
    editReply: false,
    deleteReply: false,
  });

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      <Grid container gap={1} justifyContent="center" alignItems="flex-start">
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() =>
              setDialogsState((prev) => ({ ...prev, newReply: true }))
            }
            sx={{ mt: xs ? 0 : 2, mb: 2 }}
          >
            Add Reply
          </Button>
        </ButtonGroup>

        <Grid
          item
          container
          justifyContent="center"
          // alignItems="center"
          gap={1}
        >
          {replies?.map((piece, index) => (
            <Card key={index} elevation={7} sx={{ width: 290 }}>
              <CardHeader
                dir="rtl"
                className="reply-title"
                title={piece.title}
                action={
                  <ButtonGroup>
                    <IconButton
                      size="small"
                      onClick={() =>
                        copyToClipboard(
                          piece.text,
                          <img
                            src="https://i.imgur.com/1JbtYjr.gif"
                            height={150}
                            width={150}
                          />
                        )
                      }
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </ButtonGroup>
                }
              />

              <Divider />

              <CardContent>
                <Typography
                  className="reply-text app-font"
                  sx={{
                    whiteSpace: "pre-wrap",
                    textAlign: "right",
                    direction: "rtl",
                  }}
                >
                  {piece.text}
                </Typography>
              </CardContent>

              <Divider />

              <CardActions>
                <Grid container justifyContent="space-between">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      dispatch(setEditReply({ ...piece, index: index }));
                      setDialogsState((prev) => ({
                        ...prev,
                        deleteReply: true,
                      }));
                    }}
                  >
                    <Delete />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      dispatch(setEditReply({ ...piece, index: index }));
                      setDialogsState((prev) => ({ ...prev, editReply: true }));
                    }}
                  >
                    <EditNote />
                  </IconButton>
                </Grid>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>

      <NewReplyDialog
        state={dialogsState.newReply}
        setState={(value) =>
          setDialogsState((prev) => {
            return { ...prev, newReply: value };
          })
        }
      />
      <EditReplyDialog
        state={dialogsState.editReply}
        setState={(value) =>
          setDialogsState((prev) => {
            return { ...prev, editReply: value };
          })
        }
      />
      <DeleteReplyDialog
        state={dialogsState.deleteReply}
        setState={(value) =>
          setDialogsState((prev) => {
            return { ...prev, deleteReply: value };
          })
        }
      />
    </Paper>
  );
};

export default TemplateReplies;
